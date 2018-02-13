import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Table from "./Table";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Table", () => {
  const props = {
    list: [
      {
        objectID: "objid-test1",
        title: "title1",
        author: "jason1",
        points: 100
      },
      {
        objectID: "objid-test2",
        title: "title2",
        author: "jason2",
        points: 101
      },
      {
        objectID: "objid-test3",
        title: "title3",
        author: "jason3",
        points: 102
      }
    ]
  };
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Table {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("has a valid snapshot?", () => {
    const component = renderer.create(<Table {...props} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("show 3 items in the list", () => {
    const element = shallow(<Table {...props} />);
    expect(element.find("div.list").length).toBe(props.list.length + 1); // +1 is for Table-header
  });
});
