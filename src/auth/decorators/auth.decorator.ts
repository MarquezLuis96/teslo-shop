import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuardGuard } from '../guards/user-role-guard/user-role-guard.guard';
import { RoleProtected } from './role-protected/role-protected.decorator';
import { ValidRoles } from '../interfaces';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuardGuard),
  );
}
