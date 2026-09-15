import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { API_ENDPOINTS } from '../../core/api/api-endpoints';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem('token', 'abc123');
    localStorage.setItem('user', JSON.stringify({ id: 1, nome: 'Ana', email: 'ana@example.com', role: 'USER' }));
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()]
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    localStorage.clear();
  });

  it('renders the paginated debt results returned by the API', () => {
    fixture.detectChanges();
    const request = http.expectOne((item) => item.url === API_ENDPOINTS.debt);
    request.flush({
      content: [{ id: 1, cliente: 'João', valor: 40, createdAt: '2026-01-01T10:00:00' }],
      totalElements: 1,
      totalPages: 1
    });
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('João');
    expect(fixture.nativeElement.textContent).toContain('R$');
  });
});
