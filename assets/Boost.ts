import { _decorator, assetManager, AssetManager, Canvas, Component, Size } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Boost')
export class Boost extends Component {
    @property(Canvas) private canvas2d: Canvas = null;

    private loadBundle(bundleName: string): Promise<AssetManager.Bundle> {
        return new Promise<AssetManager.Bundle>(rs => {
            assetManager.loadBundle(bundleName, (e, asset) => {
                if (e) {
                    console.error(e);
                    rs(null)
                    return;
                }
                rs(asset);
            });
        })
    }

    async start() {
        /** 加载全局脚本包 */
        await this.loadBundle("GScriptBN");
        const gCtr: any = this.node.addComponent("GCtr");
        await gCtr.init({
            canvas2d: this.canvas2d,
        })
    }
}