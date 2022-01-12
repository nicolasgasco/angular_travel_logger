import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'travel-log-footer',
  template: `<footer>
    <div class="max-container">
      <small
        >Made with ♡ by
        <a
          href="https://github.com/nicolasgasco"
          target="_blank"
          rel="noopener noreferrer"
          >Nicolas Gasco</a
        ></small
      >
    </div>
  </footer> `,
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
