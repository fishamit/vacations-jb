import React, { useState, useEffect, useContext } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { context } from "../providers/MainProvider";
import { getVacationsReports, attemptFetch } from "../utils/fetch";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

function Reports() {
  const { state, dispatch } = useContext(context);
  const [vacations, setVacations] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await attemptFetch(
          getVacationsReports,
          {
            accessToken: state.accessToken,
          },
          dispatch
        );
        setVacations(
          data
            .map(v => ({
              name: `${v.destination}(ID:${v.id})`,
              followers: v.followers,
            }))
            .sort((a, b) => b.followers - a.followers)
        );
        setFetched(true);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const arr = [];
  const max = Math.max(...vacations.map(v => v.followers));
  for (let i = 0; i <= max; i++) arr.push(i);

  return vacations.length ? (
    <Fade in timeout={1000}>
      <div style={{ height: "80vh" }}>
        <VictoryChart
          domainPadding={{ x: 50, y: 0 }}
          width={150 + (vacations.length - 1) * 130}
          style={{
            parent: {
              border: "none",
            },
          }}
        >
          <VictoryBar data={vacations} x="name" y="followers" barWidth={10} />
          <VictoryAxis
            dependentAxis
            tickValues={arr}
            tickCount={20}
            style={{
              axisLabel: { fontSize: 10, padding: 20 },
              ticks: { size: 0 },
              tickLabels: { fontSize: 10, padding: 5 },
            }}
            label="Followers"
          />
          <VictoryAxis
            style={{
              axisLabel: { fontSize: 10, padding: 20 },
              ticks: { size: 0 },
              tickLabels: { fontSize: 8, padding: 5 },
            }}
          />
        </VictoryChart>
      </div>
    </Fade>
  ) : (
    fetched && (
      <Fade in timeout={2000}>
        <Typography variant="h5" align="center">
          No reports to show.
        </Typography>
      </Fade>
    )
  );
}

export default Reports;
