import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { MessageWsService } from './message-ws.service';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: true, namespace: '/' })
export class MessageWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messageWsService: MessageWsService) {}
  handleConnection(client: Socket /*, ...args: any[]*/) {
    console.log('Cliente conectado...');
    console.log('ClientId: ', client.id);
    //throw new Error('Method not implemented.');
  }
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado...');
    console.log('ClientId: ', client.id);
    //throw new Error('Method not implemented.');
  }

  //
}
