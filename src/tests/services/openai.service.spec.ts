import { expect } from 'chai';
import { _getRepliesBelowModerationThreshold } from '../../services/openai.service';
import { mockModerationResults, mockTextList } from './openai.service.fixtures';

describe('OpenAI Service', () => {
  describe('_getRepliesBelowModerationThreshold unit tests', () => {
    it('should return only replies below moderation threshold', async () => {
      const replies = _getRepliesBelowModerationThreshold(
        mockTextList,
        mockModerationResults,
        50
      );
      expect(replies.length).to.equal(1);
      expect(replies[0]).to.deep.equal(mockTextList[0]);
    });
  });
});
