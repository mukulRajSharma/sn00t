import React from "react";
import { Paging, Pager, Column } from "devextreme-react/tree-list";
import DataGrid, { SearchPanel } from "devextreme-react/data-grid";

import { Button } from "devextreme-react/button";
import Chart, {
  ArgumentAxis,
  Legend,
  Series,
  ValueAxis,
  Label,
  Export,
  Tick,
  LoadingIndicator,
  Title,
  Subtitle,
  Format,
  CommonSeriesSettings,
  Margin,
  Grid,
  Tooltip,
  Aggregation,
  LineSeries,
} from "devextreme-react/chart";

class GraphComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "line",
    };
  }
  customizeText(e) {
    return `Day ${e.value}`;
  }
  render() {
    return (
      <div style={{ width: "90%", marginLeft: "5%", marginBottom: "20px" }}>
        <Chart
          dataSource={this.props.data}
          id="chart"
          title="Packet count v/s Time"
        >
          <Series
            argumentField="time"
            valueField="count"
            type="line"
            color="#79cac4"
          >
            <Label visible={true} backgroundColor="#c18e92" />
          </Series>
          <Export enabled={true} />
        </Chart>
      </div>
    );
  }
  handleChange(e) {
    this.setState({ type: e.value });
  }
}

export default GraphComponent;
