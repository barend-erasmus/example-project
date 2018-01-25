export class Address {
    constructor(
        public city: string,
        public country: string,
        public line1: string,
        public line2: string,
        public postalCode: string,
    ) {

    }

    public valid(): boolean {
        if (this.cityValid() && this.countryValid() && this.line1Valid() && this.line2Valid() && this.postalCodeValid()) {
            return true;
        }

        return false;
    }

    private cityValid(): boolean {
        return this.city ? true : false;
    }

    private countryValid(): boolean {
        return this.country ? true : false;
    }

    private line1Valid(): boolean {
        return this.line1 ? true : false;
    }

    private line2Valid(): boolean {
        return this.line2 ? true : false;
    }

    private postalCodeValid(): boolean {
        return this.postalCode ? true : false;
    }
}
