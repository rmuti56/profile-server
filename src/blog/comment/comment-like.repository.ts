import { EntityRepository, Repository } from "typeorm";
import { LikeComment } from "./commnet-like.entity";


@EntityRepository(LikeComment)
export class LikeCommentRepository extends Repository<LikeComment>{

}