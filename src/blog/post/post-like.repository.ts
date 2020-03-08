import { Repository, EntityRepository } from "typeorm";
import { LikePost } from "./post-like.entity";


@EntityRepository(LikePost)
export class LikePostRepository extends Repository<LikePost>{

}