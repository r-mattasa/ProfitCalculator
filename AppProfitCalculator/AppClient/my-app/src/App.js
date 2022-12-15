import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createAPIEndpoint, ENDPOINTS } from "./api";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { ProfitCalculator } from "./ProfitCalculator";

export default function App() {
  const {
    formState: { errors },
  } = useForm();

  const [profit, setProfit] = useState(0);
  const [TotalTimeCost, setTotalTimeCost] = useState(0);
  const [TotalDistanceCost, setTotalDistanceCost] = useState(0);
  const [ExpectedIncome, setExpectedIncome] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [sucessMessage, setSucessMessage] = useState("");

  const [bitData, setbitData] = useState({
    kmPrice: 0,
    hourPrice: 0,
    totalKm: 0,
    totalHours: 0,
    income: 0,
  });

  const SaveOrder = () => {
    const newData = Object.assign(bitData, {
      TotalDistanceCost,
      TotalTimeCost,
      profit,
    });

    createAPIEndpoint(ENDPOINTS.saveProfitMarginResults)
      .post(newData)
      .then((res) => {
        console.log("res", res.data);
        setSucessMessage(
          "OrderNumber " + res.data.id + "Order Saved sucessfully..."
        );
      })
      .catch((err) => console.log(err));
  };

  const GetProfitReport = (data) => {
    setSucessMessage("");
    if (data) setbitData(data);
    createAPIEndpoint(ENDPOINTS.getProfitResults)
      .post(data)
      .then((res) => {
        setProfit(res.data.profit);
        setTotalDistanceCost(res.data.totalDistanceCost);
        setTotalTimeCost(res.data.totalTimeCost);
        setProfitMargin(res.data.profit);
      })
      .catch((err) => console.log(err));
  };

  const GetExpectedProfit = (profit, profitMargin) => {
    const data = {
      Income: bitData.income,
      Profit: profit,
      ExpectedProfit: profitMargin,
    };
    createAPIEndpoint(ENDPOINTS.getProfitMarginResults)
      .post(data)
      .then((res) => {
        setExpectedIncome(res.data.expectedIncome);
      })
      .catch((err) => console.log(err));
  };

  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  return (
    <div className="App">
      <Row>
        <Col className="successMessage">
          {sucessMessage ? sucessMessage : ""}
        </Col>
      </Row>
      <Container>
        <Row>
          <Col lg={12} md={6} sm={12} className="p-5 m-auto">
            <br />
            <ProfitCalculator
              TotalTimeCost={TotalTimeCost}
              TotalDistanceCost={TotalDistanceCost}
              Profit={profit}
              ExpectedIncome={ExpectedIncome}
              onSubmitForm={GetProfitReport}
              onSubmitSecondForm={GetExpectedProfit}
            />
            <div>
              <Button type="button" className="button" onClick={SaveOrder}>
                Save Order
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
