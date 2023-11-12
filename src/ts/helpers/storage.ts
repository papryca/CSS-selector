import HtmlText from '../html-text';
import Level from '../level';
import Pair from '../pair';

class StorageHelper {
    static parseHtml(nodes: HtmlText[]): HtmlText[] {
        const result: HtmlText[] = [];
        nodes.forEach((t) => {
            let children: HtmlText[] = [];
            if (t.children) {
                children = this.parseHtml(t.children);
            }
            result.push(new HtmlText(t.tag, t.classTag, children, t.dataId));
        });
        return result;
    }

    static parse(val: string): Level[] {
        const data: Level[] = JSON.parse(val);

        const result: Level[] = [];

        data.forEach((o) => {
            const pairs: Pair[] = [];
            o.pairs.forEach((p) => {
                pairs.push(
                    new Pair(
                        p.bottom,
                        p.upper,
                        p.bottomMove,
                        p.upperMove,
                        p.bottomDataId,
                        p.upperDataId,
                    ),
                );
            });

            const level = new Level(
                pairs,
                o.answers,
                o.select,
                this.parseHtml(o.htmlText),
                o.trueId,
                o.state,
            );
            result.push(level);
        });

        return result;
    }
}

export default StorageHelper;
