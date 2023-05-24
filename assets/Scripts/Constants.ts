import { _decorator, Component} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Constants')
export class Constants extends Component {
    public static readonly EntryScene = 'entry';
    public static readonly GameScene = 'game';
    public static readonly OptionScene = 'option';
}

