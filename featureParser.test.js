
const featureParser = require('./featureParser.js');
featureParser.logEnabled = false;

const expect = require('chai').expect;

const featureText = "\n"
 + "@slow\n"
 + "Feature: Bank note\n"
 + "Let's see how bank notes behave :)\n"
 + "Scenario: dispense bank note\n"
 + "	Given Atm has banknotes:\n"
 + "		| value | count |\n"
 + "		| $100  |     1 |\n"
 + "	When $100 is to be dispensed\n"
 + "	Then following banknotes are dispensed:\n"
 + "		| value | count |\n"
 + "		| $100  |     1 |\n"
 + "\n"
 + "@ignore\n"
 + "Scenario: withdraws money with valid pin\n"
 + "   Given a card with pin '1234'\n"
 + "   When a user enters pin '1234'\n"
 + "   Then can withdraw\n";

describe('featureParser', function() {
  var feature = featureParser.parseContent('Bank note', featureText);
  it('parses feature name', function() {
    expect( feature.name ).to.eql( 'Bank note' );
  });
  it('parses feature meta', function() {
    expect( feature.meta ).to.eql( ['@slow'] );
  });
  it('parses feature description', function() {
    expect( feature.description ).to.eql('Let\'s see how bank notes behave :)');
  });
  it('parses scenario', function() {
    expect( feature.tests ).to.have.lengthOf(2);
  });
  it('parses scenario name', function() {
    expect( feature.tests[0].name ).to.eql('dispense bank note');
    expect( feature.tests[1].name ).to.eql('withdraws money with valid pin');
  });
  it('parses scenario meta', function() {
    expect( feature.tests[0].meta ).to.eql([]);
    expect( feature.tests[1].meta ).to.eql(['@ignore']);
  });
  it('parses scenario content', function() {
    expect( feature.tests[0].content ).to.match(/^Given Atm has banknotes[\s\S]*| $100  |     1 |$/);
    expect( feature.tests[1].content ).to.match(/^Given a card with pin '1234'[\s\S]*Then can withdraw/);
  });
});