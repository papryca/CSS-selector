class Pair {
    public bottom: string;

    public upper: string;

    public bottomMove: string;

    public upperMove: string;

    public upperDataId: string;

    public bottomDataId: string;

    constructor(
        bottom: string,
        upper: string,
        bottomMove: string,
        upperMove: string,
        bottomDataId: string,
        upperDataId: string,
    ) {
        this.bottom = bottom;
        this.upper = upper;
        this.bottomMove = bottomMove;
        this.upperMove = upperMove;
        this.upperDataId = upperDataId;
        this.bottomDataId = bottomDataId;
    }
}

export default Pair;
