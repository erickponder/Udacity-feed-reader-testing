/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url defined', function(){
            for(let feed of allFeeds) {
                expect(feed.url).toBeTruthy();
                expect(feed.url.length).not.toBe(0);
            }
        });
        
        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined', function(){
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
            
        });
            
    });

    /* Test if menu is hidden and toggles on and off */
    describe('The menu', function(){
        
        /*First checking if menu is hidden by default */
        it('is hidden', function() {
            let isHidden = document.body.classList.contains('menu-hidden');
            expect(isHidden).toBe(true);
        });

        
        /*Next to  check if menu opens and closes when clicked */
        it('toggles on and off', function() {
            const body = document.querySelector('body');
            let menuIcon = document.querySelector('a.menu-icon-link');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
            
            
        });
        
    });
    
    /* Next section: Checking if feed has entries*/
    describe('Initial Entries', function(){
        
        /*Start with calling a funciton for asynchronous request */
        beforeEach(function(done) {
           loadFeed(0, function() {
              done(); 
           });      
        });
        /*Tests if there is an .entry withing .feed */
        it('completes its work', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
               
    });
    
    /* Test for New Feed Selections */
    describe('New Feed Selection', function() {
        const feed = document.querySelector('.feed');
        const firstFeed = [];
        
        /*Tests when a new feed is loaded by loadFeed function */
        beforeEach(function(done) {
            loadFeed(0, function() {
                Array.from(feed.children).forEach(function(entry) {
                    firstFeed.push(entry.innerText);
                });
                loadFeed(1, done);
            });
        });
        
        it('content actually changes', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                expect(entry.innerText === firstFeed[index]).toBe(false);
            })
        });
    
    });
}());