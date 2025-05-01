import { _decorator, AudioSource, Component, instantiate, Node, Prefab, UITransform } from 'cc';
import { G_VIEW_SIZE } from '../../Boost';
import { ResManager } from '../../fw/res/ResManager';
import { AudioManager } from '../../fw/audio/AudioManager';
import { LoginAudio } from './LoginAudio';
const { ccclass, property } = _decorator;

@ccclass('LoginEntry')
export class LoginEntry extends Component {
    start() {
        // 加载背景音乐后播放
        AudioManager.getInstance().playMusic(LoginAudio.bgm);
        this.simulateLogin();
    }

    simulateLogin() {
        this.scheduleOnce(() => {
            this.loginSuccess();
        }, 1.5);
    }
    
    loginSuccess() {
        ResManager.getInstance().loadBundle("Match3BN", () => {
            let match3Entry = this.node.addComponent("Match3Entry");
            (match3Entry as any).init();
        });
    }

    update(deltaTime: number) {
        
    }
}

