import { _decorator, Canvas, Component, js, screen, ResolutionPolicy, Size, view } from 'cc';
import { UIManager } from './core/modules/ui/UIManager';
import { ResManager } from './core/modules/res/ResManager';
import { LoginCtr } from './GamePlay/modules/Login/LoginCtr';
import { Match3UI } from './GamePlay/modules/Match3/Match3UI';
import { Match3Entry } from './GamePlay/modules/Match3/Match3Entry';
const { ccclass, property } = _decorator;

@ccclass('GCtr')
export class GCtr extends Component {
    @property(Canvas) 
    private canvas2d: Canvas = null!;
    readonly loginCtr = new LoginCtr();

    async init(param: {
        canvas2d: Canvas,
    }) {
        
        UIManager.getInstance().init(param.canvas2d);

        // 登录模块初始化
        this.loginCtr.init();
        
        // 显示登录界面（传入登录成功回调函数）
        this.loginCtr.showLogin(async () => {
            await ResManager.getInstance().loadBundleAsync("Match3BN");
            UIManager.getInstance().open(Match3UI)
        })
    
        // ResManager.getInstance().loadBundle("LoginBN", _ => {
        //     const loginEntryClass = js.getClassByName("LoginEntry") as typeof Component;
        //     this.node.addComponent(loginEntryClass)
        // })
    }


}

