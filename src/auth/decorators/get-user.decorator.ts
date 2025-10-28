import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    console.log('Data del getuser decorator: ', data);

    const req = ctx.switchToHttp().getRequest();
    console.log('req: ', req);
    const user = req.user;
    console.log('req.user: ', user);

    if (!user) {
      throw new InternalServerErrorException(
        'User not found (request) (GetUser decorator).',
      );
    }

    return !data ? user : user[data];
  },
);
