const expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', ()=>{
  it('should generate correct Message object', ()=>{
    var text = 'New message';
    var from = "Yul";
    var result = generateMessage(from, text);
    expect(result.text).toBe(text);
    expect(result.from).toBe(from);
    expect( typeof result.createdAt).toBe('number');
  });
});
describe('generateLocationMessage', ()=>{
  it('should generate correct LocationMessageMessage object', ()=>{
    var latitude = '47.0961263';
    var longitude = "37.5169792";
    var from = "Test";
    var result = generateLocationMessage(from, latitude, longitude);
    expect(result.url).toBeTruthy();
    expect(result.url).toBe(`https://www.google.com.ua/maps?q=${latitude},${longitude}`);
    expect(result.from).toBe(from);
    expect( typeof result.createdAt).toBe('number');
  });
});
