import { DateObject } from "react-multi-date-picker";

export type IFormInput = {
    tile_design: string;
    aspect_ratio: string;
    head_shift?: string;
    supervisor?: string;
    shear?: number;
    production_planning_stops?: number;
    stop_title?: string;
    outer_stops?: number;
    stop_outer_title?: string;
    technical_stoppage_electricity?: number;
    mechanical_technical_stop?: number;
    technical_stoppage_facilities?: number;
    miscellaneous_technical_stoppage?: number;
    number_of_tiles?: number;
};


export interface DesignAndSizeProps {
    design: string;
    aspect_ratio: string;
}

export type IFormInputReceiceInformation = {
    date: DateObject;
    shift: string;
    lineId: string;
  };