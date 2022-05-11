import { Injectable } from '@angular/core';
import { CdkDragEnd, CdkDragStart } from '@angular/cdk/drag-drop';

import { Ship } from '../../../shared/models/ship.model';
import { GameService } from '../../../core/services/game.service';
import { Player } from '../../../shared/models/player.model';
import { Square } from '../../../shared/models/square.model';

@Injectable()
export class DeployService {
  private draggedShip: Ship | undefined;
  private dropZone: Array<Square> | [] = [];
  private player: Player;

  constructor(private gameService: GameService) {
    this.player = this.gameService.player;
  }

  public shipRotate(shipId: number): void {
    this.player.rotateShip(shipId);
  }

  public squareHover(square: Square): void {
    if(this.draggedShip) {
      this.dropZone = this.player.board.getPlacesForShip(square.coords.x, square.coords.y, this.draggedShip);

      if(this.dropZone.length) {
        this.player.board.markDropZone(this.dropZone);
      }
      
    }
  }

  public squareLeave(square: Square): void {
    if(this.draggedShip && this.dropZone.length) {
      this.player.board.unmarkDropZone(this.dropZone);
      this.dropZone = [];
    }
  }

  public dragStarted(data: {event: CdkDragStart, ship: Ship}): void {
    this.draggedShip = data.ship;

    if(this.draggedShip.deployed) {
      this.player.board.removeShip(this.draggedShip);
    }
    
    this.player.board.markForbiddenSquares();
  }

  public dragEnded(event: CdkDragEnd): void {
    if(this.draggedShip) {

      if(this.dropZone.length && this.draggedShip.deployed) {
        let ship = this.updateShip(this.draggedShip, true, this.dropZone);
        this.player.moveShip(ship);
        this.player.board.placeShip(this.dropZone);
      }

      if(this.dropZone.length && !this.draggedShip.deployed) {
        let ship = this.updateShip(this.draggedShip, true, this.dropZone);
        this.player.deployShip(ship);
        this.player.board.placeShip(this.dropZone);
      }

      if(!this.dropZone.length && this.draggedShip.deployed) {
        let ship = this.updateShip(this.draggedShip, false);
        this.player.removeShip(ship);
        this.player.board.removeShip(this.draggedShip);
      }

    } 

    this.player.board.unmarkForbiddenSquares();
    this.player.board.unmarkDropZone(this.dropZone);

    this.draggedShip = undefined;
    this.dropZone = [];
    
    event.source._dragRef.reset();
  }

  private updateShip(source: Ship, deployed: boolean, squares?: Array<Square>): Ship {
    let ship = Object.assign({}, source);
    
    if(deployed && squares) {
      ship.coords = squares.map(({ coords }) => coords);
      ship.position = {
        top: ship.coords[0].x * 3,
        left: ship.coords[0].y * 3
      };
    } else {
      ship.coords = [];
      ship.position = undefined;
    }

    ship.deployed = deployed;

    return ship;
  }
}