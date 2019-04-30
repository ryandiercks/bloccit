const sequelize = require('../../src/db/models/index').sequelize;
const Topic = require('../../src/db/models').Topic;
const Flair = require('../../src/db/models').Flair;

describe('Flair', () => {
    beforeEach((done) => {
        this.topic;
        this.flair;
        sequelize.sync({force: true}).then((res) => {
            Topic.create({
                title: 'Favorite Authors',
                description: 'A discussion of the best writers'
            }).then((topic) => {
                this.topic = topic;
                Flair.create({
                    name: 'Trending',
                    color: 'red',
                    topicId: this.topic.id
                }).then((flair) => {
                    this.flair = flair;
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

    describe('#create()', () => {
        it('should create a flair object with a name and color', (done) => {
            Flair.create({
                name: 'Reputable',
                color: 'blue',
                topicId: this.topic.id
            }).then((flair) => {
                expect(flair.name).toBe('Reputable');
                expect(flair.color).toBe('blue');
                done();
            }).catch((err) => {
                console.log(err);
                done();
            });
        });

        it('should not create a flair object with a missing name or color', (done) => {
            Flair.create({
                name: 'Reputable'
            }).then((flair) => {
                done();
            }).catch((err) => {
                expect(err.message).toContain('Flair.color cannot be null');
                done();
            });
        });
    });

    describe('#setTopic()', () => {
        it('should associate a topic and flair together', (done) => {
            Topic.create({
                title: 'How to drive in snow',
                description: "Don't be an idiot."
            }).then((newTopic) => {
                expect(this.flair.topicId).toBe(this.topic.id);
                this.flair.setTopic(newTopic).then((flair) => {
                    expect(flair.topicId).toBe(newTopic.id);
                    done();
                });
            });
        });
    });

    describe('#getTopic()', () => {
        it('should return the associated topic', (done) => {
            this.flair.getTopic().then((associatedTopic) => {
                expect(associatedTopic.title).toBe('Favorite Authors');
                done();
            });
        });
    });
});
