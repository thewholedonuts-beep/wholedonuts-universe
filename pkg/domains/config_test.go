package domains

import (
	"path/filepath"
	"testing"
)

func TestLoadConfigIncludesDocumentedDomains(t *testing.T) {
	cfg, err := LoadConfig(filepath.Join("..", "..", "config", "funnels.yaml"))
	if err != nil {
		t.Fatalf("LoadConfig() error = %v", err)
	}

	fullDomains := make(map[string]struct{}, len(cfg.Domains))
	for _, domain := range cfg.Domains {
		fullDomains[domain.Name+"."+domain.TLD] = struct{}{}
	}

	expectedDomains := []string{
		"wholedonuts.org",
		"wholedonuts.buzz",
		"wholedonuts.app",
		"wenevergonnaclose.com",
		"thenurturedchef.com",
		"thenurturedchef.foundation",
		"thenutur3dchef.com",
		"thewholedonuts-beep.github.io",
		"thewholedonts-universe.github.io",
	}

	for _, domain := range expectedDomains {
		if _, ok := fullDomains[domain]; !ok {
			t.Errorf("expected domain %q to be present in config/funnels.yaml", domain)
		}
	}
}
