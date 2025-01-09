import MainContainer from "../components/ui-components/MainContainer";
import TimeItem from "../components/sidebar/sidebar-menu/sidebar-menu-item/TimeItem"

export default function Time() {
  return (
    <MainContainer title={`Time`}>
      <TimeItem />
    </MainContainer>
  );
}
