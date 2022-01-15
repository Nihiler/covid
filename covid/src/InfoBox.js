import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({ title, cases, total }) {
  return (
    <div>
      <Card className="infoBox">
        <CardContent>
          <Typography  className="infoBox__title" color="textSecondary">{title}</Typography>

          <h2  className="infoBox__cases">{cases}</h2>
          {/* title */}
          {/* no cases */}
          <Typography color="textSecondary"  className="infoBox__total">{total} Total</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
