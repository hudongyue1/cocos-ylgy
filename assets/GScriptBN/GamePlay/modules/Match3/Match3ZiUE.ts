import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Match3ZiUE')
export class Match3ZiUE extends Component {
    /** 棋子白板 */
    @property(Sprite) private bg: Sprite = null;
    /** 棋子表面花色 */
    @property(Sprite) private sprite: Sprite = null;

}

