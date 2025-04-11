interface Conductor {
  mm2: number;
  ampacities: {
    "60": number;
    "75": number;
    "90": number;
    "110": number;
    "125": number;
    "200": number;
  };
}

interface AmpacityTable {
  "14": Conductor[] | null; //Aluminum will be null
  "12": Conductor[];
  "10": Conductor[];
  "8": Conductor[];
  "6": Conductor[];
  "4": Conductor[];
  "3": Conductor[];
  "2": Conductor[];
  "1": Conductor[];
  "0": Conductor[];
  "00": Conductor[];
  "000": Conductor[];
  "0000": Conductor[];
  "250": Conductor[];
  "300": Conductor[];
  "350": Conductor[];
  "400": Conductor[];
  "500": Conductor[];
  "600": Conductor[];
  "700": Conductor[];
  "750": Conductor[];
  "800": Conductor[];
  "900": Conductor[];
  "1000": Conductor[];
  "1250": Conductor[];
  "1500": Conductor[];
  "1750": Conductor[];
  "2000": Conductor[];
}
export interface AmpacityTables {
  copperFreeAir: AmpacityTable;
  copperConduit: AmpacityTable;
  aluminumFreeAir: AmpacityTable;
  aluminumConduit: AmpacityTable;
}
