export interface Control {
    id: number;
    shift: number;
    date: string;
    size: string;
    design: string;
    control_guy: number;
    control_code: number;
    tiles_in_the_box: number;
    finished_boxes: number;
    box_weight: number;
    boxed_area: number;
    third_grade_drop: string;
    forth_grade_drop: string;
    fifth_grade_drop: string;
    sixth_grade_drop: string;
    unmatch_color_code: number;
    unmatch_color_reason: string;
    defect_root: string;
    number_of_waste: number;
    overall_waste_percent: number;
    overall_waste_area: number;
    area_sepreted_waste_darajeZan: number;
    area_sepreted_waste_chamfer: number;
    area_sepreted_waste_schema: number;
    verified_finish_boxes: number;
    area_cutting_waste: number;
    percent_cutting_waste: number;
    area_darajezan_waste: number;
    percent_darajezan_waste: number;
    area_chamfer_waste: number;
    percent_chamfer_waste: number;
    area_schema_waste: number;
    percent_schema_waste: number;
  }
  