import { EntityRepository, Repository } from "typeorm";
import { LikeComment } from "./comment-like.entity";


@EntityRepository(LikeComment)
export class LikeCommentRepository extends Repository<LikeComment>{

}