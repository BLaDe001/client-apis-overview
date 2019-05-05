const ext = {
  //define a ListObject
  initialProperties: {},
  support: {},
  //render
  paint: function ($element, layout) {
    $element.html(`
      <h1>Hi QI-Meetup</h1>
    ` );
  }
};

export default ext;
