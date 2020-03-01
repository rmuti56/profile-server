import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ChatModule } from './chat/chat.module';
import { LogModule } from './log/log.module';
import { SystemConfigModule } from './system-config/system-config.module';
import { AuthModule } from './auth/auth.module';
import { FollowerModule } from './follower/follower.module';
import { UploadModule } from './upload/upload.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    ChatModule,
    LogModule,
    SystemConfigModule,
    FollowerModule,
    UploadModule,
    NotificationModule,
  ]
})
export class BlogModule { }
