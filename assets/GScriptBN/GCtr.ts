import { _decorator, Canvas, Component, js, screen, ResolutionPolicy, Size, view } from 'cc';
import { UIManager } from './core/modules/ui/UIManager';
import { ResManager } from './core/modules/res/ResManager';
const { ccclass, property } = _decorator;

@ccclass('GCtr')
export class GCtr extends Component {
    @property(Canvas) 
    private canvas2d: Canvas = null!;

    async init(param: {
        canvas2d: Canvas,
    }) {
        UIManager.getInstance().init(param.canvas2d);

        ResManager.getInstance().loadBundle("LoginBN", _ => {
            const loginEntryClass = js.getClassByName("LoginEntry") as typeof Component;
            this.node.addComponent(loginEntryClass)
        })
    }


}

