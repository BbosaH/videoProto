
describe('Rating test', ()=> {

  var Rating;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject((_Rating_) =>{
    Rating = _Rating_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(Rating).toBeDefined();
  });

  describe('.calculateRate()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Rating.calculateRate).toBeDefined();
    });

    it('should produce right rate', function() {
       expect(Rating.calculateRate([2,4,3,5,3])).toEqual(0);
    });
  });
  describe('.addRatingWidget()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Rating.addRatingWidget).toBeDefined();
    });
  });

  describe('.buildVideoItem()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Rating.buildVideoItem).toBeDefined();
    });
  });

});


describe('DataService test', ()=> {

  var DataService;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject((_DataService_) =>{
    DataService = _DataService_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(DataService).toBeDefined();
  });

  describe('.getData()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(DataService.getData).toBeDefined();
    });
  });
 

});

describe('SendData test', ()=> {

  var SendData;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject((_SendData_) =>{
    SendData = _SendData_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(SendData).toBeDefined();
  });

  describe('.submitData()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(SendData.submitData).toBeDefined();
    });
  });
 

});

describe('GetData test', ()=> {

  var GetData;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject((_GetData_) =>{
    GetData = _GetData_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(GetData).toBeDefined();
  });

  describe('.getData()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(GetData.getData).toBeDefined();
    });
  });
 

});

describe('Utilities test', ()=> {

  var Utilities;

  // Before each test load our api.users module
  beforeEach(angular.mock.module('services'));

  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject((_Utilities_) =>{
    Utilities = _Utilities_;
  }));

  // A simple test to verify the Users factory exists
  it('should exist', ()=> {
    expect(Utilities).toBeDefined();
  });

  describe('.isValid()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Utilities.isValid).toBeDefined();
    });
  });

  describe('.isDigit()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Utilities.isDigit).toBeDefined();
    });
  });

  describe('.isEmpty()', function() {
    // A simple test to verify the method all exists
    it('should exist', function() {
      expect(Utilities.isEmpty).toBeDefined();
    });
  });
 

});

