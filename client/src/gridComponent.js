import React from "react";
import { Paging, Pager, Column } from "devextreme-react/tree-list";
import Button from "devextreme-react/button";
import DataGrid, { SearchPanel } from "devextreme-react/data-grid";
import PieChart, {
  Series,
  Label,
  Margin,
  Export,
  Legend,
  Animation,
} from "devextreme-react/pie-chart";
import GraphComponent from "./GraphComponent.js";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function GridComponent() {
  const [data, setData] = React.useState([]);
  const [gData, setGData] = React.useState();
  const allowedPageSizes = [5, 10, 15, 20];
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  async function getData() {
    setLoading(true);
    await fetch("/sniffer")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setGData(result[result.length - 1]);
        setLoading(false);
      });
  }
  React.useEffect(() => {
    getData();
  }, []);

  const rows = data.map((item) => {
    return {
      id: item.id,
      ip1: item.ip1,
      ip2: item.ip2,
      src_port: item.src_port,
      dst_port: item.dst_port,
      protocol: item.protocol,
      time: item.time,
      data: item.data,
    };
  });
  function checkOpen(e) {
    setOpen(!open);
  }
  function formatText(arg) {
    return `${arg.argumentText} (${arg.percentText})`;
  }

  return (
    <div>
      <div style={{ width: "96%", marginLeft: "2%" }}>
        {loading && <LinearProgress color="secondary" />}
        <p style={{ textAlign: "left" }}>Packets captured:</p>
        <DataGrid
          dataSource={rows}
          allowColumnReordering={true}
          showBorders={true}
          autoExpandAll={false}
          columnAutoWidth={true}
          // onRowClick={checkOpen}
          selection={{ mode: "single" }}
          // rowAlternationEnabled={true}
        >
          <SearchPanel visible={true} />
          <Paging enabled={true} defaultPageSize={5} />
          <Pager
            showPageSizeSelector={true}
            allowedPageSizes={allowedPageSizes}
            showInfo={true}
          />
          <Column dataField="id" caption="ID" />
          <Column dataField="time" caption="TIME" width="130" />
          <Column dataField="ip1" caption="SOURCE ADDR" />
          <Column dataField="ip2" caption="DESTINATION ADDR" />
          <Column dataField="src_port" caption="SOURCE PORT" />
          <Column dataField="dst_port" caption="DESTINATION PORT" />
          <Column dataField="data" caption="DATA" />
        </DataGrid>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "5vh",
          textAlign: "center",
          marginLeft: "5%",
        }}
      >
        <div>
          <PieChart
            id="pie"
            dataSource={rows}
            palette="Bright"
            title="Source Ports"
            resolveLabelOverlapping="hide"
          >
            <Series argumentField="src_port" valueField="src_port">
              <Label visible={true} customizeText={formatText} />
            </Series>
            {/* <Margin bottom={20} /> */}
            {/* <Export enabled={true} /> */}
            <Legend visible={false} />
            <Animation enabled={false} />
          </PieChart>
        </div>
        <div style={{ marginLeft: "30px" }}>
          <PieChart
            id="pie"
            dataSource={rows}
            palette="Bright"
            title="Destination Ports"
            resolveLabelOverlapping="hide"
          >
            <Series argumentField="dst_port" valueField="dst_port">
              <Label visible={true} customizeText={formatText} />
            </Series>
            {/* <Margin bottom={20} /> */}
            {/* <Export enabled={true} /> */}
            <Legend visible={false} />
            <Animation enabled={false} />
          </PieChart>
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button
          text="Show intensity graph"
          width={300}
          onClick={checkOpen}
          disabled={false}
        />
      </div>
      {open && <GraphComponent data={gData} />}
    </div>
  );
}
