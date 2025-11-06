import { FaCircle } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import styled from "styled-components";
import ProgressionBar from "../UI/ProgressionBar";
import { BsStopwatch } from "react-icons/bs";

const Wrapper = styled.div`
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
`;

const InnerWrapper = styled.div`
  display: flex;
  padding: 0 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const ProjectInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
`;

const ProjectStats = styled.div`
  display: flex;
  max-width: 450px;
  align-items: baseline;
  gap: 24px;
  align-self: stretch;
`;

function ArchivedItem() {
  return (
    <Wrapper>
      <InnerWrapper>
        <ProjectInfo>
          <div className=" text-[#1e1e1e]  text-[18px] font-(family-name:--font-01)">
            {" "}
            Project Name
          </div>
          <div className="text-[#474747] text-[16px] font-(family-name:--font-02)">
            Lorem ipsum dolor sit amet consectetur.
          </div>
        </ProjectInfo>
        <ProjectStats>
          <div className="flex items-center gap-8 ">
            <div className="flex p-3 gap-2 justify-center items-center text-[#474747]">
              <FaCircle className="w-4 h-4  translate-y-[0.05em]" />
              <div>Archived</div>
            </div>

            <div className="flex gap-2 items-center text-[#474747]">
              80%{" "}
              <span>
                <ProgressionBar />
              </span>
            </div>

            <div className="flex gap-2 items-center text-[#474747]">
              <span>
                <BsStopwatch />
              </span>
              12h 45m
            </div>
          </div>
          <HiDotsVertical />
        </ProjectStats>
      </InnerWrapper>
    </Wrapper>
  );
}

export default ArchivedItem;
