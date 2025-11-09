import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/auth/entities/user.entity';

interface ConnectedClients {
  [id: string]: Socket;
}
@Injectable()
export class MessageWsService {
  private connectedClients: ConnectedClients = {};

  registerClient(client: Socket /*, user: User*/) {
    this.connectedClients[client.id] = client;
  }

  removeClient(clientId: string) {
    delete this.connectedClients[clientId];
  }

  getConnectedClients(): number {
    return Object.keys(this.connectedClients).length;
  }
}
