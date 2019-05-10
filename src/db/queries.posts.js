const Post = require( "./models" ).Post;
const Topic = require( "./models" ).Topic;

module.exports = {

  addPost( newPost, callback ) {
    return (
      Post.create( newPost )
      .then( ( post ) => { callback( null, post ); } )
      .catch( ( err ) => { callback( err ); } )
    )
  }
  ,
  getPost( id, callback ) {
    return (
      Post.findByPk( id )
      .then( ( post ) => { callback( null, post ); } )
      .catch( ( err ) => { callback( err ); } )
    )
  }
  ,
  deletePost( id, callback ) {
    return (
      Post.destroy( { where: { id } } )
      .then( ( destroyedCount ) => { callback( null, destroyedCount ); } )
      .catch( ( err ) => { callback( err ); } )
    )
  }
  ,
  updatePost( id, updatedPost, callback ) {
    return (
      Post.findByPk( id )
      .then( ( post ) => {
        if ( !post ) { return callback( "Post not found." ); }

        post.update( updatedPost, {
          fields: Object.keys( updatedPost )
        } )
        .then( ( post ) => { callback( null, post ); } )
        .catch( ( err ) => { callback( err ); } );
      } )
    )
  }

};
