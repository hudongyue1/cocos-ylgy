import { _decorator, Canvas, instantiate, Layers, Node, ResolutionPolicy, Size, UITransform, view, screen, js } from 'cc';
import { EViewLayer } from './EViewLayer';
const { ccclass } = _decorator;

// function getUIClassBUrl(uiClass: any): IBundleUrl {
// if (uiClass === Match3UI) {
//         return BL("Prefabs/Match3UI", "Match3BN")
//     }
//     console.log(`其它类型暂未处理`)
// }

const g_UICls2BUrl: Map<any, IBundleUrl> = new Map();
const g_Key2BUrl: Map<string, IBundleUrl> = new Map();
export function registerBUrlByCfg(cfg: {
    [uiClassName: string]: IBundleUrl
}) {
    for (let uiClassName in cfg) {
        g_Key2BUrl.set(uiClassName, cfg[uiClassName])
    }
}

export function getUIClassBUrl(uiClass: any): IBundleUrl {
    // 如果有类 -> BUrl 的注册信息，直接拿
    if (g_UICls2BUrl.has(uiClass)) {
        return g_UICls2BUrl.get(uiClass);
    }
    // 如果没有的话，从配置表拿
    let uiClassName = js.getClassName(uiClass);
    let bUrl = g_Key2BUrl.get(uiClassName);
    if (!bUrl) {
        /** 没有找到类名对应的预制体 */
        debugger;
        console.error("没有找到类名对应的预制体 uiClassName: ", uiClassName);
        return null;
    }
    // 缓存住
    g_UICls2BUrl.set(uiClass, bUrl);
    return bUrl;
}

export const G_VIEW_SIZE = new Size(0, 0);
function adapterScreen() {
    let resolutionPolicy: ResolutionPolicy = view.getResolutionPolicy();
    let designSize = view.getDesignResolutionSize();
    let frameSize = screen.windowSize;
    let frameW = frameSize.width;
    let frameH = frameSize.height;
    /** 是否是屏幕更宽 */
    const isScreenWidthLarger = (frameW / frameH) > (designSize.width / designSize.height);
    let targetResolutionPolicy = isScreenWidthLarger ? ResolutionPolicy.FIXED_HEIGHT : ResolutionPolicy.FIXED_WIDTH;
    if (targetResolutionPolicy !== resolutionPolicy.getContentStrategy().strategy) {
        /** 保证设计分辨率的内容都能显示出来 */
        view.setDesignResolutionSize(designSize.width, designSize.height, targetResolutionPolicy);
        view.emit("canvas-resize")
    }

    /** 实际的尺寸会和设计分辨率在一个维度，但是宽或高更大 */
    if (isScreenWidthLarger) {
        G_VIEW_SIZE.width = Math.ceil(designSize.height * frameSize.width / frameSize.height);
        G_VIEW_SIZE.height = designSize.height;
    } else {
        G_VIEW_SIZE.width = designSize.width;
        G_VIEW_SIZE.height = Math.ceil(designSize.width * frameSize.height / frameSize.width);
    }

    console.log(`屏幕${isScreenWidthLarger ? "更宽, 高度适配" : "更高, 宽度适配"} 设计分辨率比例下的屏幕尺寸: ${G_VIEW_SIZE.width}x${G_VIEW_SIZE.height}`);

    return isScreenWidthLarger;
}

class MyLayer {
    public readonly node: Node;
    constructor(
        public readonly layer: EViewLayer,
        public readonly canvas: Canvas,
        name: string,
    ) {
        const node = this.node = new Node(name);
        node.layer = Layers.Enum.UI_2D;
        node.addComponent(UITransform);
        canvas.node.addChild(node);
    }
}


@ccclass('UIManager')
export class UIManager {
    private m_Canvas: Canvas = null;
    private m_Layers: MyLayer[] = []
    init(canvas: Canvas) {
        this.m_Canvas = canvas;
        adapterScreen();
        for (let layer = EViewLayer.Scene, maxLayer = EViewLayer.Toast; layer <= maxLayer; ++layer) {
            this.m_Layers.push(new MyLayer(layer, canvas, EViewLayer[layer]));
        }
        
    }

    open(uiClass: any) {
        const bUrl = getUIClassBUrl(uiClass);
        gtr.res.loadPrefabByBUrl(bUrl, prefab => {
            let match3Node = instantiate(prefab);
            this.m_Layers[EViewLayer.UI].node.addChild(match3Node);
            match3Node.getComponent(UITransform).setContentSize(G_VIEW_SIZE.clone());
        })
    }
}

