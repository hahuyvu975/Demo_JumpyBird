import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
    
    @property({
        type: Prefab,
    })
    private prefabPipes = null;

    @property({
        type: Node,
    })
    private pipePoolHome;

    private pool = new NodePool();
    private createPipe;

    protected initPool(): void {
         let initCount = 3;
         for(let i = 0; i < initCount; i++) {
            this.createPipe = instantiate(this.prefabPipes)
            if(i === 0) {
                this.pipePoolHome.addChild(this.createPipe)
            } else {
                this.pool.put(this.createPipe)
            }
         }   
    }

    public addPool(): void {
        if(this.pool.size() > 0) {
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipes)
        }
        this.pipePoolHome.addChild(this.createPipe)
    }

    public reset(): void {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}

