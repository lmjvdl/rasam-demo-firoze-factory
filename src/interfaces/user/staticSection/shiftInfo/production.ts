export interface Production {
    id: number;
    shift: number;
    date: string;
    size: number;
    design: string;
    supervisor: number;
    head_shift: number;
    DarajeZan: number;
    CodeDarajeZan: number;
    ProdStopTiltle: string;
    ProdStopTime: number;
    total_production_line: number;
    operator_percent_one_to_six: number;
    overall_percent_one_to_six: number;
    one_two_percents_sum_operator: number;
    registerd_production_stops: string;
    registerd_production_stops_title: string;
}
  