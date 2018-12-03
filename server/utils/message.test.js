const expect = require('expect');
var {generateMessage} = require('./message');
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
