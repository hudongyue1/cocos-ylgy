import { _decorator, Component, instantiate, UITransform } from 'cc';
import { G_VIEW_SIZE, UIManager } from '../../../core/modules/ui/UIManager';
import { Match3UI } from './Match3UI';
import { ResManager } from '../../../core/modules/res/ResManager';
const { ccclass } = _decorator;

@ccclass('Match3Entry')
export class Match3Entry extends Component {

    async init() {
        // UIManager.getInstance();
        // ResManager.getInstance().loadPrefab("Match3BN", "Prefabs/Match3UI", prefab => {
        //     let match3Node = instantiate(prefab);
        //     this.node.addChild(match3Node);
        //     match3Node.getComponent(UITransform).setContentSize(G_VIEW_SIZE.clone());
        // });

        UIManager.getInstance().open(Match3UI);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }
}

