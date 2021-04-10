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
} from "devextreme-react/chart";
import renderer from "devextreme/core/renderer";

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
      <div style={{ width: "90%", marginLeft: "5%" }}>
        <Chart dataSource={this.props.data} id="chart">
          <Series
            argumentField="time"
            valueField="dst_port"
            type="line"
            color="#79cac4"
          >
            <Aggregation method="count" />
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
