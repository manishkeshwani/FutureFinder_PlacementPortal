import React, { useContext, useEffect, useState } from "react";
import BarChart from "./Graphs/BarChart";
import HorizontalBarChart from "./Graphs/HorizontalBarChart";
import DoughnutChart from "./Graphs/DoughnutChart";
import BubbleChart from "./Graphs/BubbleChart";
import PieChart from "./Graphs/PieChart";
import LineChart from "./Graphs/LineChart";
import Heading from "./Heading";
import { TPOAuthContext } from "./TPOAuth";
import { useNavigate } from "react-router-dom";

const Analyze = () => {
  const [CSE, setCSE] = useState({});
  // CSE={placed:12,notPlaced:24,total:36}
  const [IT, setIT] = useState({});
  const [DS, setDS] = useState({});
  const [AI, setAI] = useState({});
  const [IOT, setIOT] = useState({});
  const {TPOdata} = useContext(TPOAuthContext);
  const navigate = useNavigate('');

  // const [jobData, setJobData] = useState([]);

  const fetchStudentDetails = async (dept, placedStatus) => {
    // const response = await fetch('http://localhost:5000/fetchTotalStudentDetails');
    //to fetch placed and not placed Student
    const response = await fetch(
      `http://localhost:5000/fetchDepartmentWiseStudentDetails/${dept}/${placedStatus}`
    );
    const result = await response.json();

    if (result) {
      return result.length;
    } else {
      return false;
    }
  };

  // const fetchJobs = async () => {
  //   try {
  //     let response = await fetch('http://localhost:5000/viewJobs');
  //     let jobData = await response.json();
  //     console.log(jobData);
  //     return jobData;
  //   } catch (error) {

  //   }
  // };

  //   const jobDataPrepare = async () => {
  //     const result = await fetchJobs();
  //     const preparedData = result
  //       .filter((job) => job.postedOn) // Filter out jobs without a postedOn date
  //       .map((job) => {
  //         // Extract month and day from the postedOn date
  //         const month = parseInt(job.postedOn.slice(5, 7), 10);
  //         const day = parseInt(job.postedOn.slice(8, 10), 10);

  //         return {
  //           x: month,
  //           y: day,
  //           r: 10, // Size of the bubble, adjust as needed
  //           jobID: job.jobID,
  //           companyName: job.companyName
  //         };
  //       });

  //     setJobData(preparedData);
  //   };

  const count = async () => {
    const CSEplaced = await fetchStudentDetails("CSE", "true");
    const CSEnotPlaced = await fetchStudentDetails("CSE", "false");
    const CSEtotal = CSEplaced + CSEnotPlaced;
    setCSE({ placed: CSEplaced, notPlaced: CSEnotPlaced, total: CSEtotal });

    const ITplaced = await fetchStudentDetails("IT", "true");
    const ITnotPlaced = await fetchStudentDetails("IT", "false");
    const ITtotal = ITplaced + ITnotPlaced;
    setIT({ placed: ITplaced, notPlaced: ITnotPlaced, total: ITtotal });

    const AIplaced = await fetchStudentDetails("AI", "true");
    const AInotPlaced = await fetchStudentDetails("AI", "false");
    const AItotal = AIplaced + AInotPlaced;
    setAI({ placed: AIplaced, notPlaced: AInotPlaced, total: AItotal });

    const DSplaced = await fetchStudentDetails("DS", "true");
    const DSnotPlaced = await fetchStudentDetails("DS", "false");
    const DStotal = DSplaced + DSnotPlaced;
    setDS({ placed: DSplaced, notPlaced: DSnotPlaced, total: DStotal });

    const IOTplaced = await fetchStudentDetails("IOT", "true");
    const IOTnotPlaced = await fetchStudentDetails("IOT", "false");
    const IOTtotal = IOTplaced + IOTnotPlaced;
    setIOT({ placed: IOTplaced, notPlaced: IOTnotPlaced, total: IOTtotal });

    console.log(CSE);
    console.log(IT);
    console.log(AI);
    console.log(DS);
    console.log(IOT);
  };

  useEffect(() => {
    if(!TPOdata){
      navigate('/TPOLogin')
    }else{
      count();
    }
  }, [TPOdata]);

  if(!TPOdata){
    return(<>navigate('/TPOLogin')</>);
  }

  return (
    <div className="container">
      <Heading heading={'Analyze'}/>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
          <BarChart
            CSEplaced={CSE.placed}
            ITplaced={IT.placed}
            AIplaced={AI.placed}
            DSplaced={DS.placed}
            IOTplaced={IOT.placed}
            CSEtotal={CSE.total}
            ITtotal={IT.total}
            AItotal={AI.total}
            DStotal={DS.total}
            IOTtotal={IOT.total}
            CSEnotPlaced={CSE.notPlaced}
            ITnotPlaced={IT.notPlaced}
            AInotPlaced={AI.notPlaced}
            DSnotPlaced={DS.notPlaced}
            IOTnotPlaced={IOT.notPlaced}
          />
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 mt-3">
          <HorizontalBarChart
            CSEtotal={CSE.total}
            ITtotal={IT.total}
            AItotal={AI.total}
            DStotal={DS.total}
            IOTtotal={IOT.total}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-2 col-md-6 col-sm-12 m-auto">
          <DoughnutChart
            label={"CSE"}
            placed={CSE.placed}
            notPlaced={CSE.notPlaced}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 m-auto">
          <DoughnutChart
            label={"IT"}
            placed={IT.placed}
            notPlaced={IT.notPlaced}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 m-auto">
          <DoughnutChart
            label={"AI"}
            placed={AI.placed}
            notPlaced={AI.notPlaced}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 m-auto">
          <DoughnutChart
            label={"DS"}
            placed={DS.placed}
            notPlaced={DS.notPlaced}
          />
        </div>
        <div className="col-lg-2 col-md-6 col-sm-12 m-auto">
          <DoughnutChart
            label={"IOT"}
            placed={IOT.placed}
            notPlaced={IOT.notPlaced}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <BubbleChart />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-8">
          <LineChart />
        </div>

        <div className="col-lg-4 m-auto">
          <PieChart
            CSEplaced={CSE.placed}
            ITplaced={IT.placed}
            AIplaced={AI.placed}
            DSplaced={DS.placed}
            IOTplaced={IOT.placed}
          />
        </div>
      </div>
    </div>
  );
};

export default Analyze;
