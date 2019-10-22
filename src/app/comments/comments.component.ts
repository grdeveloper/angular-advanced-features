import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  form: FormGroup;
  comments: any[] = [
    {id: 1, label: 'Comment 1', open: false, parentId: null, children: [
        {id: 3, label: 'Comment 3 Child', open: false, parentId: 1},
        {id: 4, label: 'Comment 4 Child', open: false, parentId: 1, children: [
            {id: 5, label: 'Comment 5 Child', open: false, parentId: 4}
          ]}
      ]},
    {id: 2, label: 'Comment 2', open: false, parentId: null}
    ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.comments = this.refactorComments(this.comments);
    this.form = this.fb.group({
      comment: ['', Validators.compose([Validators.required])]
    });
  }

  openReply(id) {
    this.form.reset();
    this.comments = this.comments.map(
      comment => comment.id === id ? {...comment, open: !comment.open} : comment
    );
  }

  deleteComment(id) {
    const childElements = [];
    this.findAllChildElements(this.comments.find(el => el.id === id), childElements);
    this.comments = this.comments.filter(comment => (childElements.indexOf(comment.id) === -1));
  }

  submit(abstractForm, elementForm) {
    if (elementForm.parentElement.parentElement.matches('.comments-footer')) {
      this.comments.push(
        {id: this.comments.length + 1, label: abstractForm.value.comment, open: false, parentId: null}
        );
    } else {
      this.addComment(abstractForm.value.comment, +elementForm.parentElement.parentElement.id);
    }

    abstractForm.reset();
    console.log(this.comments);
  }

  trackByFn(index, item) {
    return item.id;
  }

  findPadding(comment) {
    const nesting = [];
    this.recursePadding(comment, nesting);
    return nesting.length;
  }

  private addComment(value, id) {
    const replyTo = this.comments.findIndex(el => el.id === id);
    const comment = this.comments.find(el => el.id === id);
    this.comments.splice(replyTo + 1, 0,
      {id: this.comments.length + 1, label: value, open: false, parentId: id}
      );
    if (comment.children && comment.children.length) {
      return comment.children.push({id: this.comments.length, label: value, open: false, parentId: id});
    }

    return comment.children = [{id: this.comments.length, label: value, open: false, parentId: id}];
  }

  private findAllChildElements(element, children) {
    if (element.children && element.children.length) {
      element.children.map(el => { this.findAllChildElements(el, children); });
    }

    children.push(element.id);
  }

  private recursePadding(comment, nesting) {
    if (comment && comment.parentId) {
      nesting.push(comment.id);
      this.recursePadding(this.comments.find(el => el.id === comment.parentId), nesting);
    }
  }

  private refactorComments(comments) {
    const commentsArray = [];
    this.recurseArray(comments, commentsArray);
    return commentsArray;
  }

  private recurseArray(comments, commentsArray) {
    comments.forEach(comment => {
      commentsArray.push(comment);

      if (comment.children && comment.children.length) {
        this.recurseArray(comment.children, commentsArray);
      }
    });
  }
}
