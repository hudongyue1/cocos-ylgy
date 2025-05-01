import { _decorator, Component, instantiate, Node, UITransform } from 'cc';
import { G_VIEW_SIZE } from '../../Boost';
import { ResManager } from '../../fw/res/ResManager';
const { ccclass, property } = _decorator;

@ccclass('Match3Entry')
export class Match3Entry extends Component {

    async init() {
        ResManager.getInstance().loadPrefab("Match3BN", "Prefabs/Match3UI", prefab => {
            let match3Node = instantiate(prefab);
            this.node.addChild(match3Node);
            match3Node.getComponent(UITransform).setContentSize(G_VIEW_SIZE.clone());
        });
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

