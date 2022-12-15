import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ProfitCalculator = ({
  TotalTimeCost,
  TotalDistanceCost,
  Profit,
  ExpectedIncome,
  onSubmitForm,
  onSubmitSecondForm,
}) => {
  const [profitForm, setProfitForm] = useState({});
  const [ProfitMarginForm, setProfitMarginForm] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerSecondField,
    handleSubmit: ReCalculateProfit,
    formState: { errors: Formerrors },
  } = useForm();

  const setField = (name, value) => {
    setProfitForm({
      ...profitForm,
      [name]: value,
    });
    if (!!errors[name])
      setErrorMessage({
        ...errors,
        [name]: null,
      });
  };

  const setProfitMarginFormField = (name, value) => {
    setProfitMarginForm({
      ...ProfitMarginForm,
      [name]: value,
    });
    if (!!Formerrors[name])
      setErrorMessage({
        ...Formerrors,
        [name]: null,
      });
  };
  const CalculateProfit = (val) => {
    onSubmitForm(val);
  };
  const onError = (error) => {
    console.log("ERROR:::", error);
  };

  const onSubmit2 = (data) => {
    onSubmitSecondForm(Profit, data.profitMargin);
  };
  const onFormError = (error) => {
    console.log("ERROR2:::", error);
  };
  return (
    <div className="MainContainer">
      <div className="Container-header">
        {" "}
        <h4>Profit Calculator</h4>
      </div>
      <div className="containerdiv">
        <div className="containerdivision1 rounded-5">
          <div className="p-5">
            <Form
              className=""
              autoComplete="off"
              onSubmit={handleSubmit(CalculateProfit, onError)}
            >
              <Row className="sm-2">
                <Form.Group as={Col} controlId="formGridPerKm">
                  <Form.Label>Cost Per Km</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cost Per Km"
                    className="mb-3"
                    step="0.01"
                    name="kmPrice"
                    value={profitForm.kmPrice}
                    {...register("kmPrice", {
                      onChange: (e) => setField("kmPrice", e.target.value),
                      required: true,

                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                    })}
                  />
                  {errors.kmPrice && (
                    <Form.Text className="text-danger">
                      {errors.kmPrice.type && <p>Km price is required </p>}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="sm-2">
                <Form.Group as={Col} controlId="formGridPerHour">
                  <Form.Label>Cost Per Hour</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Cost Per Hour"
                    className="mb-3"
                    step="0.01"
                    name="hourPrice"
                    value={profitForm.hourPrice}
                    {...register("hourPrice", {
                      onChange: (e) => setField("hourPrice", e.target.value),
                      required: "hourPrice is required",
                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                    })}
                  />
                  {errors.hourPrice && (
                    <Form.Text className="text-danger">
                      {errors.hourPrice.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>

              <Row className="sm-2">
                <Form.Group as={Col} controlId="formGridTotalKm">
                  <Form.Label>Total Km</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="TotalKm"
                    className="sm-2"
                    step="0.01"
                    name="totalKm"
                    value={profitForm.totalKm}
                    {...register("totalKm", {
                      onChange: (e) => setField("totalKm", e.target.value),
                      required: "totalKm is required",
                      minLength: {
                        value: 1,
                        message: "totalKm must be atleast 1 charecter long",
                      },
                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                    })}
                  />
                  {errors.totalKm && (
                    <Form.Text className="text-danger">
                      {errors.totalKm.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="sm-2">
                <Form.Group as={Col} controlId="formGridTotalHours">
                  <Form.Label>Total Hours </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Total Hours"
                    className="sm-2"
                    name="totalHours"
                    value={profitForm.totalHours}
                    {...register("totalHours", {
                      onChange: (e) => setField("totalHours", e.target.value),
                      required: "totalHours is required",
                      minLength: {
                        value: 1,
                        message: "totalHours must be atleast 1 charecter long",
                      },
                      valueAsNumber: true,
                      pattern: {
                        value: /^(0|[1-9]\d*)(\.\d+)?$/,
                      },
                    })}
                  />
                  {errors.totalHours && (
                    <Form.Text className="text-danger">
                      {errors.totalHours.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <Row className="sm-2">
                <Form.Group as={Col} controlId="formGridIncome">
                  <Form.Label>Income</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Income"
                    className="sm-2"
                    name="income"
                    value={profitForm.income}
                    //  onChange={(e) => setField("income", e.target.value)}
                    {...register("income", {
                      onChange: (e) => setField("income", e.target.value),
                      required: "income is required",
                    })}
                  />
                  {errors.income && (
                    <Form.Text className="text-danger">
                      {errors.income.message}
                    </Form.Text>
                  )}
                </Form.Group>
              </Row>
              <br />
              <Row className="sm-3">
                <div className="gap-5">
                  <Button type="submit" className="button">
                    Calculate Profit
                  </Button>
                </div>
              </Row>
            </Form>
          </div>
        </div>
        <div className="containerdivision2 p-5 shadow-sm rounded-5">
          <Row>
            <Col>
              <Form
                className=""
                autoComplete="off"
                onSubmit={ReCalculateProfit(onSubmit2, onFormError)}
              >
                <Row>
                  <Col>
                    <Form.Label>Total Distance Based Cost:</Form.Label>
                    <Form.Control
                      type="number"
                      className="sm-2"
                      name="TotalDistanceCost"
                      value={TotalDistanceCost}
                      readOnly={true}
                      onChange={(e) =>
                        setProfitMarginFormField(
                          "TotalDistanceCost",
                          e.target.value
                        )
                      }
                      {...registerSecondField("TotalDistanceCost")}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label>Total Time Based Costs:</Form.Label>
                    <Form.Control
                      type="number"
                      className="sm-2"
                      name="TotalTimeCost"
                      value={TotalTimeCost}
                      readOnly={true}
                      onChange={(e) =>
                        setProfitMarginFormField(
                          "TotalTimeCost",
                          e.target.value
                        )
                      }
                      {...registerSecondField("TotalTimeCost")}
                    />
                  </Col>
                </Row>
                <Row className="">
                  <Col xs="center">
                    <Form.Label>Profit:</Form.Label>
                    <Form.Control
                      type="number"
                      className="sm-2"
                      name="profit"
                      value={Profit}
                      readOnly={true}
                      onChange={(e) =>
                        setProfitMarginFormField("profit", e.target.value)
                      }
                      {...registerSecondField("profit")}
                    />
                  </Col>
                </Row>
                <Row className="sm-2">
                  <Col>
                    <Form.Group as={Row} controlId="formGridPerKm">
                      <Form.Label>Set Profit Margin : </Form.Label>
                      <Form.Control
                        type="number"
                        step="0.01"
                        placeholder="profitMargin"
                        name="profitMargin"
                        value={ProfitMarginForm.profitMargin}
                        {...registerSecondField("profitMargin", {
                          onChange: (e) =>
                            setProfitMarginFormField(
                              "profitMargin",
                              e.target.value
                            ),
                          required: "profitMargin is required",
                        })}
                      />
                      {Formerrors.profitMargin && (
                        <Form.Text className="text-danger">
                          {Formerrors.profitMargin.message}
                        </Form.Text>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <br />
                <Row className="sm-3">
                  <div className="gap-5">
                    <Button type="submit" className="button">
                      ReCalculate Profit
                    </Button>
                  </div>
                </Row>

                <Row className="sm-3">
                  <div className="gap-5">
                    <Form.Label>{"Change Income To:"} </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      placeholder="ExpectedIncome"
                      name="ExpectedIncome"
                      value={ExpectedIncome}
                      readOnly={true}
                    />
                  </div>
                </Row>
              </Form>
            </Col>
          </Row>
          <br />
        </div>
      </div>
    </div>
  );
};
