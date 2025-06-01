export interface Planning {
    id: number;
    shift: number;
    date: string;
    size: string;
    design: string;
    planner: number;
    size_type: "small" | "medium" | "large";
    standard_size: number;
    standard_deviation: number;
    computing_function_device: number;
    computational_stops: string;
    scheduled_stops: string;
    scheduled_stops_title: string;
    outdoor_stops: string;
    outdoor_stops_title: string;
    calculated_production_stops: string;
    planner_percent_one_to_six: number;
    sizer_percent_one_to_six: number;
    one_two_percents_sum_planner: number;
    one_two_percents_sum_sizer: number;
  }
  