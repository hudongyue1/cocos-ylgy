import { _decorator, Canvas, Component, js, screen, ResolutionPolicy, Size, view } from 'cc';
import { registerBUrlByCfg, UIManager } from './core/modules/ui/UIManager';
import { ResManager } from './core/modules/res/ResManager';
import { LoginCtr } from './GamePlay/modules/Login/LoginCtr';
import { Match3UI } from './GamePlay/modules/Match3/Match3UI';
import { PrefabCfg } from './auto/PrefabCfg';
const { ccclass, property } = _decorator;

// 新增全局变量声明
declare global {
    const gtr: GCtr;
}

@ccclass('GCtr')
export class GCtr extends Component {
    @property(Canvas) 
    private canvas2d: Canvas = null!;

    readonly loginCtr = new LoginCtr();
    readonly res = new ResManager();
    readonly ui = new UIManager();

    async init(param: {
        canvas2d: Canvas,
    }) {
        // 全局变量设置
        (globalThis as any)["gtr"] = this;
        // 注册prefab配置
        registerBUrlByCfg(PrefabCfg);

        // 初始化UIManager
        gtr.ui.init(param.canvas2d);
        // 登录模块初始化
        gtr.loginCtr.init();
        
        
        // 显示登录界面（传入登录成功回调函数）
        gtr.loginCtr.showLogin(async () => {
            await gtr.res.loadBundleAsync("Match3BN");
            gtr.ui.open(Match3UI)
        })
    
        // ResManager.getInstance().loadBundle("LoginBN", _ => {
        //     const loginEntryClass = js.getClassByName("LoginEntry") as typeof Component;
        //     this.node.addComponent(loginEntryClass)
        // })
    }


}

