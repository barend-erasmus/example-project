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

    protected cityValid(): boolean {
        return this.city ? true : false;
    }

    protected countryValid(): boolean {
        return this.country ? true : false;
    }

    protected line1Valid(): boolean {
        return this.line1 ? true : false;
    }

    protected line2Valid(): boolean {
        return this.line2 ? true : false;
    }

    protected postalCodeValid(): boolean {
        return this.postalCode ? true : false;
    }

}
